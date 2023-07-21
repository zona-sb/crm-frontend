import { Container, Row, Col, Card } from 'react-bootstrap';
import SignUpForm from '../../components/registration/SignUpForm';
import './SignUpPage.css';

const SignUpPage = () => (
  <Container fluid className='vh-100'>
    <Row className='justify-content-center align-content-center vh-100'>
      <Col xs={12} md={8} xxl={6}>
        <Card className='shadow-sm custom__registrationCard'>
          <SignUpForm />
        </Card>
      </Col>
    </Row>
  </Container>
);
export default SignUpPage;
