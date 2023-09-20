import instance from "@/lib/apiAxios";

export const getUserDetailsFromUid = async (uid: string) => {
    try {
        const user = await instance.get(`me`);
        
    } catch (error) {
        
    }
 
};
