import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';


const myTheme = createMuiTheme({
  typography: {
      "fontFamily": '"Roboto", "Helvetica", "Arial", sans-serif',
      "fontSize": 14
  },
  palette: {
      primary: {
          main: '#3b3c36'
        },
      secondary: {
          main: '#5a9367'
      }
    },
    status: {
        danger: pink,
    }
})


export default myTheme;