import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';

const PLACEHOLDER_IMAGE = "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"

const MovieCard = ({ data }) => {
    const router = useRouter()
    const handleNavigate = (id) => {
        router.push(`movie/${id}`)
    }
    return (
        <Col xs={6} sm={4} md={3} onClick={() => handleNavigate(data.id)}>
            <Card className="movie-card mb-3">
                <img
                    src={data.thumb || PLACEHOLDER_IMAGE}
                    alt="movie"
                    className="img-fluid movie-thumb"
                />
                <CardBody>
                    <h4 className="movie-title">{data.title}</h4>
                    <p>{data.publishing_year}</p>
                </CardBody>
            </Card>
        </Col>
    )
}
export default MovieCard;