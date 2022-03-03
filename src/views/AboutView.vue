<template>
  <div class="col">
    <h1>Form covid</h1>
    <tr class="container-md my-1">
      วันที่
      <input type="date" v-model="date" />
    </tr>
    <tr>
      <td>ขื่อ <input type="text" v-model="fname" /></td>
      <td>นามสกุล <input type="text" v-model="lname" /></td>
    </tr>
    <tr>
      <label for="atk">ผลตรวจ ATK :</label>
      <select v-model="atk">
        <option disabled value="">Please select one</option>
        <option>-</option>
        <option>+</option>
      </select>
    </tr>
    <tr>
      หมายเลขโทรศัพท์
      <input type="text" v-model="number" />
    </tr>
    <tr>
      Email
      <input type="text" v-model="email" />
    </tr>
    <button class="btn btn-primary my-2" @click="readData()">read data</button>

    <button class="btn btn-success my-2" @click="addData()">add data</button>

    <table class="table table-dark table-striped container-md text-center">
      <thead>
        <tr>
          <th scope="col">วันที่</th>
          <th scope="col">ชื่อ</th>
          <th scope="col">นามสกุล</th>
          <th scope="col">atk</th>
          <th scope="col">เบอร์โทร</th>
          <th scope="col">Email</th>
          <th scope="col">ลบข้อมูล</th>
        </tr>
      </thead>
      <tbody v-for="(data, index) in csDoc" :key="index">
        <tr>
          <th scope="row">{{ data.date }}</th>
          <td>{{ data.fname }}</td>
          <td>{{ data.lname }}</td>
          <td>({{ data.atk }})</td>
          <td>{{ data.number }}</td>
          <td>{{ data.email }}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteData(data.id)"
            >
              ลบข้อมูล
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import db from "../plugins/firebaselnit";
export default {
  data() {
    return {
      csDoc: [],
      date: "",
      fname: "",
      lname: "",
      number: "",
      email: "",
      atk: "",
    };
  },

  methods: {
    async addData() {
      try {
        const newdocRef = await doc(collection(db, "csmju"));
        await setDoc(newdocRef, {
          id: newdocRef.id,
          date: this.date,
          fname: this.fname,
          lname: this.lname,
          number: this.number,
          email: this.email,
          atk: this.atk,
        });
        console.log("Document written with ID: ", newdocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      this.readData();
    },
    async readData() {
      this.csDoc = [];
      const querySnapshot = await getDocs(collection(db, "csmju"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.csDoc.push(doc.data());
      });
    },
    async deleteData(id) {
      await deleteDoc(doc(db, "csmju", id));
      this.readData();
    },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
