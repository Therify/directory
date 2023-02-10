import GlobalStyles from '@mui/material/GlobalStyles';
import { css } from '@mui/material/styles';

export function Globals() {
    return (
        <GlobalStyles
            styles={css`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
                @font-face {
                    font-family: 'P22Mackinac';
                    src: url(/fonts/P22Mackinac.woff2) format('woff2'),
                        url(/fonts/P22Mackinac.woff) format('woff');
                    font-style: bold;
                    font-weight: 700;
                    font-display: swap;
                }

                * {
                    box-sizing: border-box;
                    --webkit-font-smoothing: antialiased;
                    --moz-osx-font-smoothing: grayscale;
                    font: inherit;
                }

                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: Roboto, -apple-system, BlinkMacSystemFont,
                        Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans,
                        Droid Sans, Helvetica Neue, sans-serif;
                }

                img,
                picture,
                svg,
                video {
                    display: block;
                    max-width: 100%;
                    height: auto;
                }

                body {
                    min-height: 100vh;
                }

                input,
                textarea,
                select,
                button {
                    font-family: inherit;
                    font-size: inherit;
                    line-height: inherit;
                }

                body {
                    height: 100vh;
                }
            `}
        />
    );
}
