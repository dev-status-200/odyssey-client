import { addValues } from '/redux/persistValues/persistValuesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { incrementTab } from '/redux/tabs/tabSlice';
import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import Router from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

const SEJobList = ({ jobsData, sessionData, type }) => {

  const queryClient = useQueryClient();
  const changedValues = useSelector((state)=>state.persistValues);
  const companyId = useSelector((state) => state.company.value);
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(jobsData.status=="success"){
      setRecords(jobsData.result);
    }
  }, [])

  return(
  <>
    {companyId!='' &&
    <div className='base-page-layout'>
      <Row>
      <Col md={10}>
        <h5>
          {type=="SE"?"SEA Export":type=="SI"?"SEA Import":type=="AE"?"AIR Export":type=="AI"?"AIR Import":""} Job List
        </h5>
        </Col>
      <Col md={1}>
        <button className='btn-custom right'
          onClick={()=>{
            Router.push(`/seaJobs/jobList`)
          }}
        >List</button>
      </Col>
      <Col md={1}>
        <button className='btn-custom right'
          onClick={()=>{
            queryClient.removeQueries({ queryKey: ['jobData',{ type }] })
            let obj = {...changedValues.value}
            obj[type] = ""
            dispatch(addValues(obj));
            dispatch(incrementTab({
              "label":type=="SE"?"SE JOB":type=="SI"?"SI JOB":type=="AE"?"AE JOB":"AI JOB",
              "key":type=="SE"?"4-3":type=="SI"?"4-6":type=="AE"?"7-2":"7-5",
              "id":"new"
            }));
            Router.push(
              type=="SE"?`/seaJobs/export/new`:
              type=="SI"?`/seaJobs/import/new`:
              type=="AE"?`/airJobs/export/new`:
              `/airJobs/import/new`
            )
          }}
        >Create</button>
      </Col>
      </Row>
      <hr className='my-2' />
      <div className='mt-3' style={{maxHeight:500, overflowY:'auto'}}>
      <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Basic Info</th>
            <th>Shipment Info</th>
            <th>Weight Info</th>
            <th>Other Info</th>
            <th>Status</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
        {
        records.map((x, index) => {
        return (
          <tr key={index} className='f row-hov'
            onClick={() => {
              queryClient.removeQueries({ queryKey: ['jobData',{ type }] })
              let obj = {...changedValues.value}
              obj[type] = ""
              dispatch(addValues(obj));
              dispatch(incrementTab({
                "label":type=="SE"?"SE JOB":type=="SI"?"SI JOB":type=="AE"?"AE JOB":"AI JOB",
                "key":type=="SE"?"4-3":type=="SI"?"4-6":type=="AE"?"7-2":"7-5",
                "id":x.id
              }))
              Router.push(
                type=="SE"?`/seaJobs/export/${x.id}`:
                type=="SI"?`/seaJobs/import/${x.id}`:
                type=="AE"?`/airJobs/export/${x.id}`:
                `/airJobs/import/${x.id}`
              )
            }}
          >
            <td>{index + 1}</td>
            <td>
              <span className='blue-txt fw-7'>{x.jobNo}</span>
              <br/>Nomination: <span className='grey-txt'>{x.nomination}</span>
              <br/>Freight Type: <span className='grey-txt'>{x.freightType}</span>
              <br/>Sub Type: <span className='grey-txt '>{x.subType}</span><br/>
            </td>
            <td>
              POL: <span className='grey-txt'>{x.pol}</span><br/>
              POD: <span className='grey-txt'>{x.pod}</span><br/>
              FLD: <span className='grey-txt'> {x.fd}</span>
            </td>
            <td>
              {/* Container: <span className='grey-txt'>{x.container}</span><br/> */}
              Weight: <span className='grey-txt'>{x.weight}</span>
            </td>
            <td>
              Party:<span className='blue-txt fw-5'> {x.Client===null?"":x.Client.name}</span><br/>
              Transportion: <span className='blue-txt fw-5'>{x.transportCheck!=''?'Yes':'No'}</span>
              <br/>
              Custom Clearance: <span className='blue-txt fw-5'>{x.customCheck!=''?'Yes':'No'}</span>
            </td>
            <td>
              {x.approved=="true"?<img src={'/approve.png'} height={70} className='' />:"Not Approved"}
            </td>
            <td className='blue-txt fw-6'>
              {x.created_by?.name}
            </td>
          </tr>
          )
        })}
        </tbody>
      </Table>
      </div>
    </div>
    }
  </>
)}

export default SEJobList;