GroupDocs Word, Excel, Powerpoint, PDF Viewer Embedder lets you embed several
types of files into your Drupal pages using the GroupDocs High Fidelity
Viewer - allowing inline viewing (and optional downloading) of the following
file types, with no Flash or PDF browser plug-ins required.

-- REQUIREMENTS --

* Drupal 'Libraries API' module - http://drupal.org/project/libraries

* Drupal 'lightbox2' module - http://drupal.org/project/lightbox2

* Drupal 'jquery_update' module - http://drupal.org/project/jquery_update

* GroupDocs PHP SDK - Download the adapted version for Drupal module from:
  https://github.com/groupdocs/drupal-groupdocs-viewer/raw/master/groupdocs-php.zip
  and unpack into your libraries
  location e.g. sites/all/libraries/groupdocs-php

* jQuery File Tree - Download the adapted version for Drupal module from:
  https://github.com/groupdocs/drupal-groupdocs-viewer/raw/master/jquery_file_tree.zip
  and unpack into your libraries
  location e.g. sites/all/libraries/jquery_file_tree

-- INSTALLATION --

1. Unpack the groupdocs_viewer folder and contents in the appropriate modules
   directory of your Drupal installation. This is probably sites/modules/
   Make sure that groupdocs_viewer folder is writable.
2. Enable Embedded Groupdocs Viewer in the admin modules section.
3. Now you need to configure your Embedded Groupdocs Viewer module
   and fill Client ID and API Key. You can find them in your GroupDocs account.
4. Click on "manage fields" under Home » Administration » Structure and
   add new field with type "Groupdocs embedded code".
5. Go edit or add new node of type that you added new field to. Enter document
   GUID to the text input or click "Choose file" to open pop-up in which you
   will able to document file from your GroupDocs account or upload new one.

   Note: Current version of module support creation of only one field!
