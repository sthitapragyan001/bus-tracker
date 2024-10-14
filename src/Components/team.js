import React from 'react';
import team from './teamlist';
import './team.css'

const TeamStructure = () => {
  const memcard = (member) => {
    return (
      <div class="memcard" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <img id='dp' src={require(`./pics/${member.id}.jpg`)} alt={member.name} style={{ borderRadius: 40, marginTop: '5%', aspectRatio:1,width:'90%'  }} />
        <div className="infocont">
          <p>{member.name}</p>
          <p>{member.post}</p>
        </div>
        {/* <img id='arr' src={require('./downarrow.png')}/> */}
        <div className='xtra'>
          <p style={{fontSize:'1.0vw'}}>{member.dept} </p>
          <p style={{fontSize:'1.0vw'}}>{member.hostel} </p>
        </div>
        <div className='contact' style={{ display: 'inline-block',paddingBottom:'10%' }}>
          <a href={member.linkedin} target='_blank' ><img src={require('./linkedin.png')} width={'15%'} /></a>
          <a href={`mailto:${member.mail}`} target='_blank' ><img src={require('./mail.png')} width={'15%'} /></a>
        </div>
      </div>
    )
  }
  const execard = (member) => {
    return (
      <div class="memcard" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <img id='dp' src={require(`./pics/${member.id}.jpg`)} alt={member.name} style={{ borderRadius: 40, marginTop: '5%', aspectRatio:1,width:'90%'  }} />
        <div className="exeinfocont">
          <p>{member.name}</p>
          {/* <p>{member.post}</p> */}
        </div>
        {/* <img id='arr' src={require('./downarrow.png')}/> */}
        <div className='xtra'>
          <p>{member.dept} </p>
          <p>{member.hostel} </p>
        </div>
        <div className='contact' style={{ display: 'inline-block',paddingBottom:'10%' }}>
          <a href={member.linkedin} target='_blank' ><img src={require('./linkedin.png')} width={'15%'} /></a>
          <a href={`mailto:${member.mail}`} target='_blank' ><img src={require('./mail.png')} width={'15%'} /></a>
        </div>
      </div>
    )
  }

  return (
    <div className='team'>
      {/* <h1 className='teamtitle'>
        THE TEAM
      </h1> */}
      <div className='container' style={{marginInlineStart:'21vw'}} >
        {team.mentors.map((member) => {
          return (
            <div className='column' key={member.id} style={{float:'left'}}>
              {memcard(member)}
            </div>
          )
        })}
      </div>
      {/* Executives */}
      <div className='trow'>
        {team.executives.map((member) => {
          return (
            <div className='column' key={member.id}>
              {execard(member)}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TeamStructure;
