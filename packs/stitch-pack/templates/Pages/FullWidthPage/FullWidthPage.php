<?php

namespace App\Pages;

use SilverStripe\CMS\Model\SiteTree;

class FullWidthPage extends SiteTree 
{
    private static string $table_name = 'FullWidthPage';
    private static string $singular_name = 'Full width page';
    private static string $plural_name = 'Full width pages';
    private static string $description = 'A page that displays content in full-width';
    private static string $icon_class = 'font-icon-p-document';
    private static bool $can_be_root = true;
}
