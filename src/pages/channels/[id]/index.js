import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import copy from 'copy-to-clipboard';

import { useRTC } from '../../../hooks/useRTC';

const Comp = () => {
  const router = useRouter();
  const { id: channelId } = router.query;
  useRTC({ channelId, localStreamElementId: 'localStream', remoteStreamElementId: 'remoteStream' });
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Row className="section" />
          <Row className="screens">
            <Col className="d-flex screen-container">
              <div id="localStream" className="screen" />
            </Col>
            <Col className="d-flex screen-container">
              <div id="remoteStream" className="screen" />
            </Col>
          </Row>
          <Row className="section" />
          <Row>
            <Col>
              <Button type="primary" block onClick={onInvite}>
                Invite your friend
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Comp;

function onInvite() {
  const url = location.href;
  copy(url);
  alert('已經複製網址囉，快貼給朋友來邀請他加入吧');
}
