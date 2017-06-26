import React from 'react';
import { Glyphicon } from 'react-bootstrap';
const s = require('./footer.css');
function Footer() {
    return (<footer>
      <div className={s.footer}>
        Created with <Glyphicon glyph="heart"/> by <a className={s.link} href="http://www.integrant.com/">Integrant Inc.</a>
      </div>
    </footer>);
}
export default Footer;
//# sourceMappingURL=footer.jsx.map