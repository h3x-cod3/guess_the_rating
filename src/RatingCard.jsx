import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function RatingCard({ movie, onSubmit, message, messageColor, gameOver, onReset, onPlayAgain }) {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

    const displayValue = hover !== -1 ? hover : (value > 0 ? value : "");

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 1,
                marginBottom: 1
            }}>
            <Card elevation={0}
                sx={{
                    width: 350,
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center"
                }} >
                <Typography variant="h5"
                    sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 300,
                    }}>
                    {movie.title}
                </Typography>
                <Typography variant="caption"
                    sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 100,
                        marginBottom: 1
                    }}>
                    {movie.year}
                </Typography>

                <Box sx={{
                    display: 'inline-flex',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0.7
                }}>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        max={10}
                        readOnly={gameOver}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    <Typography variant="caption"
                        sx={{
                            position: 'absolute',
                            left: '100%',
                            marginLeft: 1,
                            fontWeight: 100,
                            fontSize: 12,
                            width: '30px',
                            textAlign: 'left'
                        }}>
                        {displayValue}
                    </Typography>
                </Box>


                {!gameOver ? (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onSubmit(value)}
                    >
                        Submit
                    </Button>
                ) : (
                    <>
                        <Grid container spacing={1}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Grid>
                                <Button
                                    variant="contained"
                                    color="success" 
                                    size="small"
                                    onClick={onPlayAgain}

                                >
                                    play again
                                </Button>
                            </Grid>
                            <Grid>
                                <Button
                                    variant="contained"
                                    color="error" 
                                    size="small"
                                    onClick={onReset}
                                >
                                    main menu
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}

                <Typography
                    variant="subtitle2"
                    sx={{
                        color: messageColor ? `${messageColor}.main` : 'inherit',
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 1.,
                        width: '100%',
                        display: 'flex'
                    }}>
                    {message}
                </Typography>
            </Card>
        </Container>
    );
}