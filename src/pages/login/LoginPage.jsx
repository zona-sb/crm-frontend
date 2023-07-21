import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../../components/login/LoginForm';
import './LoginPage.css';

const LoginPage = () => (
  <Container fluid className='vh-100'>
    <Row className='justify-content-center align-content-center vh-100'>
      <Col xs={12} md={8} xxl={6}>
        <Card className='shadow-sm custom__loginCard'>
          <LoginForm />
        </Card>
      </Col>
    </Row>
  </Container>
);
export default LoginPage;
