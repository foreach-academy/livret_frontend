import React, { useEffect, useState } from 'react';
import '../../styles/HomePage/HomePage.css';
import FormationCard from '../../components/pages/FormationCard';
import StrategicInfo from '../../components/pages/homePage/StrategicInfo';
import DOMPurify from 'dompurify'; 
import TrainingServices from '../../services/TrainingServices';
import Header from '../../components/shared/navbar/Header'
import HomePageSection from '../../components/pages/homePage/HomePageSection';
import DescriptionHomePage from '../../components/pages/homePage/DescriptionHomePage';
import UserServices from '../../services/UserServices';
import EquipeMember from '../../components/pages/homePage/EquipeMember';
import RoleServices from '../../services/RoleServices'
import Slider from '../../components/pages/homePage/Slider';
const HomePage = () => {
  const [trainings, setTrainings] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(null);
  const [members, SetMembers] = useState([]);
  const [roles, setRoles] = useState([]);

  const AdminRole = roles.find(role => role.name === "Admin");

  useEffect(() => {
    TrainingServices.fetchAllTrainings(setTrainings);
  }, []);

  const fetchMembersByRole = async () => {
    const response = await UserServices.getUserByRole(AdminRole.id)
    SetMembers(response.data)
    console.log("Données utilisateur récupérées :", response.data);
  }

  useEffect(() => {
    RoleServices.fetchAllRoles(setRoles);
  }, []);
  useEffect(() => {
    if (AdminRole) {
      fetchMembersByRole();
    }
  }, [AdminRole]);

  return (
    <>
      <Header setHeaderHeight={setHeaderHeight} />
      <div className="homepage" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="header-image">
          <img src={process.env.PUBLIC_URL + "/images/bg/slider-developpeur-web.jpeg"} alt="Accueil" />
        </div>
        <HomePageSection title="Présentation de l'organisme">
          <DescriptionHomePage />
        </HomePageSection>
        <HomePageSection title="Nos Formations">
          <Slider itemsPerPage={4}>
          {trainings && trainings.map((training) => (
            <FormationCard
              key={training.id}
              title={training.title}
              description={training.description}
              url={`trainings/${training.id}`}
            />
          ))}
          </Slider>
        </HomePageSection>
        <HomePageSection title="Notre Equipe">
        <Slider itemsPerPage={4}>
          {members.map((member, index) => (
            <EquipeMember
              key={index}
              photo={member.photo}
              name={`${member.firstname} ${member.lastname}`}
              position={member.position}
              email={DOMPurify.sanitize(member.email)}
            />
          ))}
          </Slider>
        </HomePageSection>
        <HomePageSection title="La qualité étant une des valeurs que nous revendiquons.">
          <StrategicInfo />
        </HomePageSection>
      </div>
    </>
  );
};

export default HomePage;
