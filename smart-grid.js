var smartgrid    = require('smart-grid');

var settings = {
    filename: '_smart-grid',
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1230px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '991.98px'
        },
        sm: {
            width: '767px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '575px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('app/sass/general', settings);