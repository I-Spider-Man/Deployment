import axios from "axios";

export const fetchUserData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/Admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchPicture=async(PictureName)=>{
  try{
    console.log(PictureName);
    const response=await axios.get(`http://localhost:8080/Picture/${PictureName}`,{responseType:'arraybuffer',});
    const blob=new Blob([response.data],{type:response.headers['Content-Type']});
    return (URL.createObjectURL(blob));
  }catch(error){
    return console.log(error);
  }
}
export const fetchUserDataById = async (Id) => {
  try {
    const response = await axios.get(`http://localhost:8080/Admin/users/${Id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};


export const fetchEventsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/events");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};
  
export const fetchActiveEventsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/ActiveEvents");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};

export const fetchInavtiveEventsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/inActiveEvents");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};

export const fetchGroupsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/groups");
      const groupWithOrganizerData=await Promise.all(
          response.data.map(async(group)=>{
            const organizerWithUserData=await fetchOrganizerDataById(group.organizerId);
            return {
              ...group,
              organizerData: organizerWithUserData
            };
          })
      )
      return groupWithOrganizerData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};

export const fetchActiveGroupsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/ActiveGroups");
      const groupWithOrganizerData=await Promise.all(
        response.data.map(async(group)=>{
          const organizerWithUserData=await fetchOrganizerDataById(group.organizerId);
          return {
            ...group,
            organizerData: organizerWithUserData
          };
        })
    )
    return groupWithOrganizerData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};

export const fetchInActiveGroupsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/InActiveGroups");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};

export const fetchOrganizerDataById = async(id)=>{
  try{
    const organizer = await axios.get(`http://localhost:8080/Admin/organizers/${id}`)
  .then(async (organizer) => {
    return axios.get(`http://localhost:8080/User/${organizer.data.userId}`)
      .then((userData) => {
        return {
          ...organizer.data,
          userData: userData.data
        };
      });
  });
    return organizer;
    
  }catch(error){
    console.log("error while fetching organizer by Id :" + error);
  }
}

export const fetchOrganziersData = async () => {
  try {
      const response = await axios.get("http://localhost:8080/Admin/organizers");
      const organizerWithUserData=await Promise.all(
         response.data.map(async(organizer)=>{
        const response1=await axios.get(`http://localhost:8080/Admin/users/${organizer.userId}`)
        return {
          ...organizer,
          userData:response1.data,
        };
      })
      );
      return organizerWithUserData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};

export const fetchTouristSpotsData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/Admin/touristSpots");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchSpotDataById=async(spotId)=>{
  try{
    const response=await axios.get(`http://localhost:8080/spots/${spotId}`);
    return response.data;
  }catch(error){
    return console.log(error);
  }
}
export const fetchEventDataByEventId=async(eventId)=>{
  try{
    const response=await axios.get(`http://localhost:8080/activeEvents/${eventId}`);
    return response.data;
  }catch(error){
    return console.log(error);
  }
}