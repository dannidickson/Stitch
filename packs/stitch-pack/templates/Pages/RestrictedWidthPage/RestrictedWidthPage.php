<?php

namespace App\Pages;

use SilverStripe\CMS\Model\SiteTree;

class RestrictedWidthPage extends SiteTree 
{
    private static string $table_name = 'RestrictedWidthPage';
    private static string $singular_name = 'Restricted width page';
    private static string $plural_name = 'Restricted width pages';
    private static string $description = 'A page with a left side menu and restricted width content';
    private static string $icon_class = 'font-icon-p-document';
    private static bool $can_be_root = true;
}
