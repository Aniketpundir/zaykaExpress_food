import React, { useContext, useState } from "react";
import "./RestaurentAddF.css";
import axios from "axios";
import { Storecontext } from "../../../context/Storecontext";

const RestaurentAddF = () => {
  const { url } = useContext(Storecontext);

  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    locality: "",
    district: "",
    state: "",
    pin_code: "",
    lati: "",
    longi: "",
  });

  // 📍 Get current location
  const location = () => {
    alert(
      "Click OK to allow location access. Make sure you are at your restaurant location."
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setData((prev) => ({
            ...prev,
            lati: position.coords.latitude,
            longi: position.coords.longitude,
          }));
        },
        (error) => {
          alert("Location access denied");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  // 📝 Input handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Register Restaurant
  const register = async (e) => {
    e.preventDefault();

    const newUrl = url + "/api/restro/register";

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("locality", data.locality);
    formData.append("district", data.district);
    formData.append("state", data.state);
    formData.append("pin_code", data.pin_code);
    formData.append("lati", data.lati);
    formData.append("longi", data.longi);
    formData.append("image", image);

    try {
      const res = await axios.post(newUrl, formData);

      if (res.data.success) {
        alert("Restaurant registered successfully");

        setData({
          name: "",
          email: "",
          password: "",
          phone: "",
          locality: "",
          district: "",
          state: "",
          pin_code: "",
          lati: "",
          longi: "",
        });

        setImage(null);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  return (
    <div className="Add-restaurent-container">
      <h1>Add Your Restaurant Details</h1>

      <div className="form-start">
        <form onSubmit={register}>
          <div className="form-input">
            <input
              className="document"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />

            <input
              placeholder="Restaurant Name"
              name="name"
              type="text"
              value={data.name}
              onChange={onChangeHandler}
              required
            />

            <input
              placeholder="Mobile Number"
              name="phone"
              type="number"
              value={data.phone}
              onChange={onChangeHandler}
              required
            />

            <input
              placeholder="Email ID"
              name="email"
              type="email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />

            <input
              placeholder="Password"
              name="password"
              type="password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />

            <input
              placeholder="Locality"
              name="locality"
              type="text"
              value={data.locality}
              onChange={onChangeHandler}
              required
            />

            <input
              placeholder="District"
              name="district"
              type="text"
              value={data.district}
              onChange={onChangeHandler}
              required
            />

            <input
              placeholder="State"
              name="state"
              type="text"
              value={data.state}
              onChange={onChangeHandler}
              required
            />

            <input
              placeholder="Pin Code"
              name="pin_code"
              type="text"
              value={data.pin_code}
              onChange={onChangeHandler}
              required
            />

            <div className="location">
              <input
                placeholder="Latitude"
                name="lati"
                type="text"
                value={data.lati}
                readOnly
                required
              />

              <input
                placeholder="Longitude"
                name="longi"
                type="text"
                value={data.longi}
                readOnly
                required
              />

              <p onClick={location}>
                Click here to get current location (Latitude & Longitude)
              </p>

              <span>
                Ensure you are physically present at the restaurant location.
              </span>
            </div>

            <button type="submit" className="submitButton">
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurentAddF;
