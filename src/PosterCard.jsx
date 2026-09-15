import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Container } from '@mui/material';

export default function PosterCard({ movie }) {
    return (
        <>
            <Container>
                <Card elevation={5} 
                sx={{ 
                    maxWidth: 350,
                }} 
                >
                    <CardMedia
                        component="img"
                        image={movie.poster}
                        height="auto"
                    />
                </Card>
            </Container>
        </>
    );
}