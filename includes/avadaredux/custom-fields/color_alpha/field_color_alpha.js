/*
 Field Color (color)
 */

/*global jQuery, document, avadaredux_change, avadaredux*/

(function( $ ) {
    'use strict';

    avadaredux.field_objects = avadaredux.field_objects || {};
    avadaredux.field_objects.color = avadaredux.field_objects.color || {};

    $( document ).ready(
        function() {

        }
    );

    avadaredux.field_objects.color.init = function( selector ) {

        if ( !selector ) {
            selector = $( document ).find( ".avadaredux-group-tab:visible" ).find( '.avadaredux-container-color:visible' );
        }

        $( selector ).each(
            function() {

                var el = $( this );
                var parent = el;

                if ( !el.hasClass( 'avadaredux-field-container' ) ) {
                    parent = el.parents( '.avadaredux-field-container:first' );
                }
                if ( parent.is( ":hidden" ) ) { // Skip hidden fields
                    return;
                }
                if ( parent.hasClass( 'avadaredux-field-init' ) ) {
                    parent.removeClass( 'avadaredux-field-init' );
                } else {
                    return;
                }

                el.find( '.avadaredux-color-init' ).wpColorPicker(
                    {
                        change: function( e, ui ) {
                            $( this ).val( ui.color.toString() );
                            avadaredux_change( $( this ) );
                            el.find( '#' + e.target.getAttribute( 'data-id' ) + '-transparency' ).removeAttr( 'checked' );
                        },
                        clear: function( e, ui ) {
                            $( this ).val( '' );
                            avadaredux_change( $( this ).parent().find( '.avadaredux-color-init' ) );
                        }
                    }
                );

                el.find( '.avadaredux-color' ).on(
                    'focus', function() {
                        $( this ).data( 'oldcolor', $( this ).val() );
                    }
                );

                el.find( '.avadaredux-color' ).on(
                    'keyup', function() {
                        var value = $( this ).val();
                        var color = colorValidate( this );
                        var id = '#' + $( this ).attr( 'id' );

                        if ( value === "transparent" ) {
                            $( this ).parent().parent().find( '.wp-color-result' ).css(
                                'background-color', 'transparent'
                            );

                            el.find( id + '-transparency' ).attr( 'checked', 'checked' );
                        } else {
                            el.find( id + '-transparency' ).removeAttr( 'checked' );

                            if ( color && color !== $( this ).val() ) {
                                $( this ).val( color );
                            }
                        }
                    }
                );

                // Store the old valid color on keydown
                el.find( '.avadaredux-color' ).on(
                    'keydown', function() {
                        $( this ).data( 'oldkeypress', $( this ).val() );
                    }
                );

                // When transparency checkbox is clicked
                el.find( '.color-transparency' ).on(
                    'click', function() {
                        if ( $( this ).is( ":checked" ) ) {

                            el.find( '.avadaredux-saved-color' ).val( $( '#' + $( this ).data( 'id' ) ).val() );
                            el.find( '#' + $( this ).data( 'id' ) ).val( 'transparent' );
                            el.find( '#' + $( this ).data( 'id' ) ).parent().parent().find( '.wp-color-result' ).css(
                                'background-color', 'transparent'
                            );
                        } else {
                            if ( el.find( '#' + $( this ).data( 'id' ) ).val() === 'transparent' ) {
                                var prevColor = $( '.avadaredux-saved-color' ).val();

                                if ( prevColor === '' ) {
                                    prevColor = $( '#' + $( this ).data( 'id' ) ).data( 'default-color' );
                                }

                                el.find( '#' + $( this ).data( 'id' ) ).parent().parent().find( '.wp-color-result' ).css(
                                    'background-color', prevColor
                                );

                                el.find( '#' + $( this ).data( 'id' ) ).val( prevColor );
                            }
                        }
                        avadaredux_change( $( this ) );
                    }
                );
            }
        );
    };
})( jQuery );
