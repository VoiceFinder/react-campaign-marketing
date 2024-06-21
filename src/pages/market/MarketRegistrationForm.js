import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketService from '../../services/MarketService';
import styles from '../../assets/styles/MarketRegistrationForm.module.css';

function MarketRegistrationForm() {
    // const [businessCertificate, setBusinessCertificate] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [companyPhotos, setCompanyPhotos] = useState([]);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [description, setDescription] = useState('');
    // const [keywords, setKeywords] = useState('');
    const [menus, setMenus] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        // const { name, files } = e.target;
        // if (name === "businessCertificate") {
        //     setBusinessCertificate(files[0]);
        // } else if (name === "companyPhotos") {
        //     setCompanyPhotos(Array.from(files));
        //     setFileNames(Array.from(files).map(file => file.name));
        // }
        const { files } = e.target;
        setCompanyPhotos(Array.from(files));
        setFileNames(Array.from(files).map(file => file.name));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // const keywordList = keywords.split(',').map(keyword => keyword.trim());
        const menuList = menus.split(',').map(menu => menu.trim());
        const marketData = {
            companyName,
            businessType,
            phone,
            address: address,
            detailAddress: detailAddress,
            description,
            // keywords: keywordList,
            menus: menuList
        };

        formData.append('marketData', new Blob([JSON.stringify(marketData)], { type: 'application/json' }));
        // formData.append('businessCertificate', businessCertificate);
        companyPhotos.forEach(photo => {
            formData.append('companyPhotos', photo);
        });

        try {
            console.log(formData);
            await MarketService.registerMarket(formData);
            alert('Market registered successfully!');
            navigate('/biz/markets');
        } catch (error) {
            console.error('Failed to register market:', error);
            alert('Failed to register market.');
        }
    };

    const handleAddressClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                if (data.userSelectedType === 'R') { 
                    addr = data.roadAddress;
                } else { 
                    addr = data.jibunAddress;
                }

                if (data.userSelectedType === 'R') {
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                }

                setAddress(`${addr} ${extraAddr}`);
            }
        }).open();
    };

    return (
        <div className={styles.registrationFormContainer}>
            <h2>Register Your Market</h2>
            <form onSubmit={handleSubmit}>
                {/* <div className={styles.formGroup}>
                    <label htmlFor="businessCertificate">Business Certificate</label>
                    <input type="file" name="businessCertificate" onChange={handleFileChange} required />
                </div> */}
                <div className={styles.formGroup}>
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="businessType">Business Type</label>
                    <input type="text" value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="Business Type" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <div className={styles.addressContainer}>
                        <div className={styles.findAddress}>
                          <input type="text" value={address} placeholder="Address" readOnly />
                          <input type="button" onClick={handleAddressClick} value="Find Address" />
                        </div>
                        <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="Detail Address" required />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                </div>
                {/* <div className={styles.formGroup}>
                    <label htmlFor="keywords">Keywords (comma separated)</label>
                    <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma separated)" required />
                </div> */}
                <div className={styles.formGroup}>
                    <label htmlFor="menus">Menus (comma separated)</label>
                    <input type="text" value={menus} onChange={(e) => setMenus(e.target.value)} placeholder="Menus (comma separated)" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="companyPhotos">Company Photos</label>
                    <input type="file" name="companyPhotos" multiple accept="image/*" onChange={handleFileChange} />
                </div>
                {fileNames.length > 0 && (
                    <div>
                        <p>Selected files:</p>
                        {fileNames.map((fileName, index) => (
                            <p key={index}>{fileName}</p>
                        ))}
                    </div>
                )}
                <button type="submit">Register Market</button>
            </form>
        </div>
    );
}

export default MarketRegistrationForm;
