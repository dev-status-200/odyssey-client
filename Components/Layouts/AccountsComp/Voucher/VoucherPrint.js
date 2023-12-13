import React from 'react';
import { Col, Row } from "react-bootstrap";

const VoucherPrint = ({compLogo}) => {

    const paraStyles = { lineHeight:1.2, fontSize:11 }
    const heading = { lineHeight:1, fontSize:11, fontWeight:'800', paddingBottom:5 };
    const Line = () => <div style={{backgroundColor:"grey", height:1, position:'relative', top:12}}></div>
    const border = "1px solid black";

  return (
  <div className='pb-5 px-5 pt-4'>
    <Row>
        <Col md={4} className='text-center'>
            {compLogo=="1"&&
            <>
                <img src={'/seanet-logo.png'} style={{filter: `invert(0.5)`}} height={100} />
                <div>SHIPPING & LOGISTICS</div>
            </>
            }
            {compLogo=="2"&&
            <>
                <img src={'/aircargo-logo.png'} style={{filter: `invert(0.5)`}} height={100} />
            </>
            }
        </Col>
        <Col>
        <div className='text-center '>
            <div style={{fontSize:20}}><b>{compLogo=="1"?"SEA NET SHIPPING & LOGISTICS":"AIR CARGO SERVICES"}</b></div>
            <div style={paraStyles}>House# D-213, DMCHS, Siraj Ud Daula Road, Karachi</div>
            <div style={paraStyles}>Tel: 9221 34395444-55-66   Fax: 9221 34385001</div>
            <div style={paraStyles}>Email: {compLogo=="1"?"info@seanetpk.com":"info@acs.com.pk"}   Web: {compLogo=="1"?"www.seanetpk.com":"www.acs.com.pk"}</div>
            <div style={paraStyles}>NTN # {compLogo=="1"?"8271203-5":"0287230-7"}</div>
        </div>
        </Col>
    </Row>
    <Row>
        <Col md={5}><Line/></Col>
        <Col md={2}>
            <div className='text-center fs-15' style={{whiteSpace:'nowrap'}}>
                <strong>Voucher</strong>
            </div>
        </Col>
        <Col md={5}><Line/></Col>
    </Row>
  </div>
  )
}

export default React.memo(VoucherPrint)