import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import short from 'short-uuid';

const Comp = () => {
  const channelId = short.generate();
  return (
    <Container>
      <Row className="section" />
      <Row>
        <Col className="text-center">
          <h1>Welcome to Video Chat</h1>
        </Col>
      </Row>
      <Row className="section" />
      <Row>
        <Col className="text-center">
          <Link href={`/channels/${channelId}`}>
            <Button>Create Channel</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Comp;
