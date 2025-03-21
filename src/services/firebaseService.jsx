import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../config/firebaseconfig";
import { uploadImageToCloudinary } from "../config/cloudinaryConfig"; 

// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values) => {
    try {
      if (values.imgUrl) {
        const imgUrl = await uploadImageToCloudinary(values.imgUrl,collectionName);
        values.imgUrl = imgUrl;
      }
      // Thêm tài liệu vào bộ sưu tập
      await addDoc(collection(db, collectionName), values);
  
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  };

  export const fetchDocumentsRealtime = (collectionName, callback) => {
    const collectionRef = collection(db, collectionName);
  
    // Lắng nghe dữ liệu thay đổi trong thời gian thực
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
  
      // Gọi callback với dữ liệu mới nhất
      callback(documents);
    });
  
    // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
    return unsubscribe;
  };

// Update a document in a given collection with an optional image upload
export const updateDocument = async (collectionName,values) => {
  
  if (values.imgUrl) {
    const imgUrl = await uploadImageToCloudinary(values.imgUrl,collectionName);
    values.imgUrl = imgUrl;
  }
  await updateDoc(doc(collection(db, collectionName), values.id), values);
};

export const deleteDocument = async (collectionName, docId) => {

  await deleteDoc(doc(collection(db, collectionName), docId));
};