import Skill from "./Skill";

const SkillList = () => {
  return (
    <div className='skill-list'>
      <Skill skill='React' emoji='👌' color='darkblue' />
      <Skill skill='Node.js' emoji='✌️' color='orange' />
      <Skill skill='Django' emoji='💕' color='purple' />
      <Skill skill='Flask' emoji='😎' color='indigo' />
      <Skill skill='CPython' emoji='😘' color='green' />
      <Skill skill='C/C++' emoji='😢' color='violet' />
      <Skill
        skill='Databases(SQL -> MySQL, PostgreSQL NoSQL-> MongoDB, Cassandra)'
        emoji='💖'
        color='yellow'
      />
      <Skill skill='Quing Systems(Redis)' emoji='✌️🙌' color='#f0ff' />
    </div>
  );
};

export default SkillList;
