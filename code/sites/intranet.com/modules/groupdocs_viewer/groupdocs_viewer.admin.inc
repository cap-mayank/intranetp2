<?php
/**
 * @file
 * Functions relating to the admin of this module
 */

/**
 * Form constructor for the file uploadingform.
 *
 * @see groupdocs_viewer_menu()
 */
function groupdocs_viewer_uploading_form($form, &$form_state)
{
    $jquery_file_tree_path = libraries_get_path('jquery_file_tree');

    $form['groupdocs_upload'] = array(
        '#name' => 'file',
        '#type' => 'file',
        '#title' => t('Choose a file GroupDocs Viewer'),
        '#title_display' => 'invisible',
        '#size' => 50,
        '#theme_wrappers' => array(),
        '#weight' => -10,
        '#attached' => array(
            'js' => array(
                $jquery_file_tree_path . '/jquery.file_tree.js' => array('type' => 'file'),
                drupal_get_path('module', 'groupdocs_viewer') . '/js/tree_viewer_page.js' => array('type' => 'file'),
            ),
            'css' => array(
                $jquery_file_tree_path . '/jquery.file_tree.css',
                drupal_get_path('module', 'groupdocs_viewer') . '/css/groupdocs_viewer.css',
            ),
        ),
    );

    $form['submit'] = array(
        '#type' => 'submit',
        '#value' => t('Go!'),
    );

    return $form;
}

/**
 * Form submission handler for groupdocs_viewer_uploading_form().
 *
 * groupdocs_viewer_uploading_form submit process
 * move upload file to module directory
 * call Groupdocs Api to upload file
 * using private and public keys from config page
 * unset file fom module directory.
 *
 * Call javascript function that will pass file guid to
 * parent window's test input
 *
 * @see groupdocs_viewer_uploading_form()
 */
function groupdocs_viewer_uploading_form_submit($node, &$form_state)
{
    if ($_FILES["file"]['error'] !== 0) {
        print "Error on file uploading";
        exit();
    }
    $groupdocsphp_path = libraries_get_path('groupdocs-php');
    require_once $groupdocsphp_path . '/APIClient.php';
    require_once $groupdocsphp_path . '/StorageApi.php';
    require_once $groupdocsphp_path . '/GroupDocsRequestSigner.php';
    require_once $groupdocsphp_path . '/FileStream.php';
    $login = variable_get('groupdocs_client_login');
    $password = variable_get('groupdocs_client_password');

    $basePath = 'https://api.groupdocs.com/v2.0';
//Create signer object
    $signer = new GroupDocsRequestSigner("123");
//Create apiClient object
    $apiClient = new APIClient($signer);
//Creaet Shared object
    $shared = new SharedApi($apiClient);
//Set base path
    $shared->setBasePath($basePath);
//Set empty variable for result
    $result = "";
//Login and get user data
    $userData = $shared->LoginUser($login, $password);
//Check status
    if ($userData->status == "Ok") {
        //If status Ok get all user data
        $result = $userData->result->user;
        $private_key = $result->pkey;
        $user_id = $result->guid;
    } else {
        throw new Exception($userData->error_message);
    }


    $tmp_name = $_FILES["file"]["tmp_name"];
    $name = $_FILES["file"]["name"];

    $fs = FileStream::fromFile($tmp_name);
    $signer = new GroupDocsRequestSigner($private_key);
    $ApiClient = new APIClient($signer);
    $ApiStorage = new StorageApi($ApiClient);
    $result = $ApiStorage->Upload($user_id, $name, 'uploaded', null, null, $fs);
    $url = "https://apps.groupdocs.com/document-viewer/embed/{$result->result->guid}";
    $url = $signer->signUrl($url);
    $signature = explode("=", $url);
    print "<script>
    window.parent.jQuery('input[name*=\"groupdocs_embedded_code\"]').val('" . $result->result->guid . "?signature=" . $signature[1]  . "');
    window.parent.Lightbox.end()
    </script>";
    drupal_exit();
}

/**
 * Page callback for groupdocs_viewer_menu().
 *
 * This page displaying file tree
 * from your GroupDocs account.
 *
 * @see groupdocs_viewer_menu()
 */
function groupdocs_viewer_treeviewer_page()
{
    $groupdocsphp_path = libraries_get_path('groupdocs-php');
    require_once $groupdocsphp_path . '/APIClient.php';
    require_once $groupdocsphp_path . '/StorageApi.php';
    require_once $groupdocsphp_path . '/GroupDocsRequestSigner.php';
    require_once $groupdocsphp_path . '/FileStream.php';
    $path = urldecode($_POST['dir']);
    if ($path == NULL || $path == "/") {
        $path = "";
    }

    $login = variable_get('groupdocs_client_login');
    $password = variable_get('groupdocs_client_password');
    if (empty($login) or empty($login)) {
    } else {
        $basePath = 'https://api.groupdocs.com/v2.0';
//Create signer object
        $signer = new GroupDocsRequestSigner("123");
//Create apiClient object
        $apiClient = new APIClient($signer);
//Creaet Shared object
        $shared = new SharedApi($apiClient);
//Set base path
        $shared->setBasePath($basePath);
//Set empty variable for result
        $result = "";
//Login and get user data
        $userData = $shared->LoginUser($login, $password);
//Check status
        if ($userData->status == "Ok") {
            //If status Ok get all user data
            $result = $userData->result->user;
            $private_key = $result->pkey;
            $user_id = $result->guid;
        }
    }

    if (!isset($private_key) || !isset($user_id)) {
        print t("Please, fill in correctly Client Login and Client Password on 'GD Viewer' configuration page.");
    } else {
        $signer = new GroupDocsRequestSigner($private_key);
        $ApiClient = new APIClient($signer);
        $ApiStorage = new StorageApi($ApiClient);

        $cur_path = drupal_substr($path, 0, drupal_strlen($path) - 1);

        $result = $ApiStorage->ListEntities($user_id, $cur_path);

        $files = $result->result->files;
        $folders = $result->result->folders;

        $items = array(
            'attributes' => array('class' => 'jqueryFileTree'),
            'type' => 'ul',
        );

        foreach ($folders as $item) {
            $items['items'][] = array(
                'data' => l($item->name, '#', array('attributes' => array('rel' => $path . $item->name . '/'))),
                'class' => array('directory', 'collapsed'),
            );
        }
        foreach ($files as $item) {
            $url = "https://apps.groupdocs.com/document-viewer/embed/{$item->guid}";
            $url = $signer->signUrl($url);
            $signature = explode("=", $url);
            $items['items'][] = array(
                'data' => l($item->name, '#', array('attributes' => array('rel' => $item->guid . "?signature=" . $signature[1] , 'class' => 'iframe'))),
                'class' => array('file', 'ext_' . drupal_strtolower($item->file_type)),
            );
        }

        $output = theme_item_list($items);
        print $output;
    }
}
