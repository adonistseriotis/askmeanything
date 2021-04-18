import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';


const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
      danger: pink,
  }
});

export default theme;