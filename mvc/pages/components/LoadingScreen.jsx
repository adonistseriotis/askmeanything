import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'

const LoadingScreen = () => {
    return (
        <Grid container justify={'center'} alignItems={'center'} style={{width:'100vw', height:'100vh'}}>
            <CircularProgress />
        </Grid>
    )
}

export default LoadingScreen;