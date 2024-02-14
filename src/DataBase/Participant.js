import axios from "axios";
import { fetchUserDataById } from "./User";
import { fetchGrpDataById } from "./Group";
import { fetchOrganizerDataById } from "./Organizer";
export const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };
  export const fetchParticipantDetailsById = async (participantId) => {
    try {
      const response = await axios.get(`http://localhost:8080/Admin/participants/${participantId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching participant details:', error);
    }
  };
export const fetchParticipantsData=async ()=>{
    try{
      const response = await axios.get("http://localhost:8080/Admin/participants");
      const participantWithUserData=await Promise.all(
        response.data.map(async(participant)=>{
          const userdata=await fetchUserDataById(participant.userId);
          return {
            ...participant,
            userData:userdata
          }
        })
      )
      console.log(participantWithUserData);
      const participantWithGroupData=await Promise.all(
        participantWithUserData.map(async(participant)=>{
          const group=await fetchGrpDataById(participant.groupId);
          return {
            ...participant,
            groupData:group
          };
        })
      );
      console.log(participantWithGroupData);
      return participantWithGroupData;
    }catch(error){
      console.log(error);
      return []
    }
  }
  export const fetchParticipatedGroups=async(userId)=>{
    try{
        const response=await axios.get(`http://localhost:8080/Participant/allGroupsParticipated/${userId}`);
        const groupWithOrganizerData=await Promise.all(
            response.data.map(async(group)=>{
                const res=await fetchOrganizerDataById(group.organizerId);
                return {
                    ...group,
                    organizerData: res,
                }
            })
        )
        return groupWithOrganizerData;
    }catch(error){
        console.log(error);
        return [];
    }
}