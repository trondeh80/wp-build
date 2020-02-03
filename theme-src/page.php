<?php
get_header();

while (have_posts()) : the_post();
    $pageId = get_the_ID();
    $post = get_post($pageId);
    ?>
    <main>
        <div class="container">
            <div class="row">
                <div class="col col-lg-12">
                    <h1><? the_title(); ?></h1>
                    <? the_content(); ?>
                </div>
            </div>
        </div>
    </main>
<?php
endwhile;
get_footer();
