import './Footer.css'

import githubIcon from '../../assets/images/icons/github-icon.png';
import linkedinIcon from '../../assets/images/icons/linkedin-icon.png';

const Footer = () => (
    <div>
        <div id="footer-top-bar">
            <a href="#top">Back to Top</a>
        </div>
        <div id="footer-container">
            <p>Babel Pages Platform</p>
            <p className="footer-text-small">Developed and Designed by João Vitor Donaton</p>
            <p className="footer-text-small" style={{marginBottom: "5rem"}}>Open Source Project</p>

            <div id="footer-icons-container">
                <a href="https://github.com/joaovdonaton/">
                    <img src={githubIcon} alt="github icon"/>
                </a>
                <a href="https://www.linkedin.com/in/joao-donaton/">
                    <img src={linkedinIcon} alt="linkedin icon"/>
                </a>
            </div>
            <p className="footer-text-small" style={{margin: "1rem auto"}}>© 2024 Babel Pages</p>
        </div>
    </div>
);

export default Footer;