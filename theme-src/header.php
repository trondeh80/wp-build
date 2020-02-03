<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?php wp_title(); ?></title>
    <link href="<?= get_template_directory_uri(); ?>/style.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width">

    <style><?= getInlineCss(); ?></style>
    <?php
    wp_head();
    ?>
</head>

<body <?= body_class() ?>>

<header>
</header>
