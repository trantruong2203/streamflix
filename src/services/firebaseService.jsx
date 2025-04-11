import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where, setDoc, getDoc, writeBatch } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../config/firebaseconfig";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../config/cloudinaryConfig";

// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values) => {
  try {
    // Nếu có ảnh thì upload lên Cloudinary trước
    if (values.imgUrl) {
      const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
      values.imgUrl = imgUrl;
    }

    // Thêm document vào Firestore
    const docRef = await addDoc(collection(db, collectionName), values);

    // Trả về đối tượng đã thêm kèm ID
    return { id: docRef.id, ...values };

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
export const updateDocument = async (collectionName, values) => {

  if (values.imgUrl) {
    const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
    values.imgUrl = imgUrl;
  }
  const { id, ...data } = values;
  // Update the document in the collection    
  await updateDoc(doc(collection(db, collectionName), values.id), data);
};

// Fetch all documents from a given collection
export const deleteDocument = async (collectionName, values) => {
  // Xóa ảnh trên Cloudinary nếu tồn tại
  if (values.imgUrl && values.imgUrl.includes('cloudinary.com')) {
    // Lấy `public_id` từ URL của Cloudinary
    const publicId = values.imgUrl.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
    await deleteImageFromCloudinary(publicId);
  }
  await deleteDoc(doc(collection(db, collectionName), values.id));
};

// Thêm nhiều tài liệu vào một bộ sưu tập cùng lúc
export const addMultipleDocuments = async (collectionName, documents) => {
  try {
    const batch = writeBatch(db);

    for (const document of documents) {
      // Tạo một bản sao của document để tránh thay đổi dữ liệu gốc
      const docData = { ...document };

      // Chỉ xử lý imgUrl nếu nó tồn tại và không phải undefined
      if (docData.imgUrl && docData.imgUrl !== undefined) {
        const imgUrl = await uploadImageToCloudinary(docData.imgUrl, collectionName);
        docData.imgUrl = imgUrl;
      } else {
        // Nếu không có imgUrl, đặt giá trị mặc định hoặc xóa trường này
        delete docData.imgUrl;
      }

      const docRef = doc(collection(db, collectionName));
      batch.set(docRef, docData);
    }

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error adding multiple documents:', error);
    throw error;
  }
};