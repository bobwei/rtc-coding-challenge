import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';

import { useRTC } from '../../../hooks/useRTC';

const Comp = () => {
  const router = useRouter();
  const { id: channelId } = router.query;
  useRTC({ channelId });
  return (
    <Container>
      <Row className="section" />
      <Row>
        <Col>{channelId}</Col>
      </Row>
    </Container>
  );
};

export default Comp;
