import axios from 'axios';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';

// Hàm lấy dữ liệu từ API
export const fetchDataFromAPI = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        throw error;
    }
};

// Hàm lưu dữ liệu vào Firebase
export const saveDataToFirebase = async (collectionName, data) => {
    try {
        // Kiểm tra xem collection đã tồn tại chưa
        const querySnapshot = await getDocs(collection(db, collectionName));
        
        if (querySnapshot.empty) {
            // Nếu collection trống, thêm dữ liệu mới
            const docRef = await addDoc(collection(db, collectionName), data);
            console.log('Dữ liệu đã được lưu với ID:', docRef.id);
            return docRef.id;
        } else {
            console.log('Collection đã tồn tại dữ liệu');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lưu dữ liệu vào Firebase:', error);
        throw error;
    }
};

// Hàm kết hợp: lấy dữ liệu từ API và lưu vào Firebase
export const fetchAndSaveData = async (apiUrl, collectionName) => {
    try {
        // Lấy dữ liệu từ API
        const data = await fetchDataFromAPI(apiUrl);
        
        // Lưu dữ liệu vào Firebase
        const docId = await saveDataToFirebase(collectionName, data);
        
        return {
            success: true,
            data: data,
            docId: docId
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}; 