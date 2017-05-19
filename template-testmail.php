<?php
/**
 * Template Name: Test mail
 */
?>
<?php get_header(); ?>
<div id="content" <?php Avada()->layout->add_class( 'content_class' ); ?> <?php Avada()->layout->add_style( 'content_style' ); ?>>
<?php
$start_message = "Bonjour,<br />Une nouvelle inscription a été effectuée sur le site <a href='".site_url()."'>".site_url()."</a>.<br />Ci-dessous les informations concernant l'inscription:<br /><br />";
$message_mail = "Customer&nbsp;firstname&nbsp;:&nbsp;Develop<br&nbsp;/>Customer&nbsp;name&nbsp;:&nbsp;Develop&nbsp;ARETMIC<br&nbsp;/>Customer&nbsp;title&nbsp;:&nbsp;Doctor<br&nbsp;/>Customer&nbsp;Payment&nbsp;option&nbsp;:&nbsp;Card&nbsp;Payment<br&nbsp;/>Customer&nbsp;email&nbsp;:&nbsp;develop@aretmic.com<br&nbsp;/>Customer&nbsp;Laboratory&nbsp;/&nbsp;Institution&nbsp;/&nbsp;Press&nbsp;:&nbsp;Test&nbsp;1135&nbsp;...<br&nbsp;/>Customer&nbsp;Phone&nbsp;:&nbsp;123456789<br&nbsp;/>Customer&nbsp;Postal&nbsp;Address&nbsp;:&nbsp;1&nbsp;Rue&nbsp;de&nbsp;la&nbsp;repubilque<br&nbsp;/>Customer&nbsp;Country&nbsp;:&nbsp;France<br&nbsp;/>";
	$message_mail = str_replace("&nbsp;", " ", $message_mail);
	$custom_subject = "New registration - HWWC";

$end_message = "<br /><br />Bien cordialement.<br /> L'équipe HWWC.";

$final_message = $start_message.$message_mail.$end_message;
	// Envoie mail au commerçant
	// wp_mail( string|array $to, string $subject, string $message, string|array $headers = '', string|array $attachments = array() )
	$headers[] = 'From: HWWC <admin@hwwc.mg>';
	$headers[] = 'Content-Type: text/html; charset=UTF-8';
	var_dump(wp_mail('directeur.informatique@netunivers.com', $custom_subject, $final_message, $headers));
?>
</div>
	<?php do_action( 'avada_after_content' ); ?>
<?php get_footer();