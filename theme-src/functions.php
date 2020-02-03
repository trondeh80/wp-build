<?php
if (!defined("ABSPATH")) exit;

$DEFAULT_INLINE_CSS_FILE = dirname(__FILE__) . "/style.critical.css";

// Helper function to include inline css.
function getInlineCss($file = null) {
    global $DEFAULT_INLINE_CSS_FILE;

    $css = $file ? $file : $DEFAULT_INLINE_CSS_FILE;
    if (file_exists($css)) {
        return file_get_contents($css);
    }
    return '';
}