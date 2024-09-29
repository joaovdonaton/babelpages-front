import '../login/LoginPage.css'
import './EditProfilePage.css'
import './ProfilePage.css'
import {useParams} from "react-router-dom";
import {ChangeEvent, useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.ts";
import userIcon from "../../assets/images/icons/user-icon.png";
import GenericClientError from "../../util/GenericClientError.ts";
import {BABEL_URL, countryCodeToName} from "../../util/constants.ts";
import useFetchMultipart from "../../hooks/useFetchMultipart.ts";
import ProfileUpdateFields from "../../interfaces/body/ProfileUpdateFields.ts";
import * as Cookies from "js-cookie";

/*
* TODO:
*  - Fix the case where we omit fields (backend doesn't accept "", we must omit for patch)
*  - Error messages for invalid length for bio/occupation
*  - Fetch new data for current profile.
*  - Make sure we can clear the Profile Picture
*  - Flesh out details
*  - Test for all kinds of use cases and combinations
* */

const EditProfilePage = () => {
    const { username } = useParams();
    const { user } = useContext(UserContext);

    const [ profileImg, setProfileImg ] = useState<undefined|File>(undefined);
    const [formData, setFormData] = useState<{bio: string, country: string, occupation: string}>({
        bio: user!.profile.bio == null ? "" : user!.profile.bio,
        country: user!.profile.country == null ? "" : user!.profile.country,
        occupation: user!.profile.occupation == null ? "" : user!.profile.occupation,
    })

    const { doRequest, statusCode} = useFetchMultipart<ProfileUpdateFields>(
        BABEL_URL + "users/self",
        "PATCH",
        Cookies.default.get("token")
    );

    function changeFile(e: ChangeEvent<HTMLInputElement>) {
        setProfileImg(e.target.files === null ? undefined : e.target.files[0]);
    }

    function handleSave(){
        doRequest({name: "profile", content: formData}, profileImg !== undefined ? {name: "file", content: profileImg} : undefined)
    }

    if(username !== user?.username){
        throw new GenericClientError("FORBIDDEN", "You do not have access to this page.");
    }

    return (<div id="login-page-container">
        <div id="edit-page-panel">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img id="profile-img" src={(!profileImg ? undefined : URL.createObjectURL(profileImg) )|| user!.profile.profilePictureUrl || userIcon}
                     alt="profile picture"/>

                <input id="edit-page-upload" type="file" accept="image/png, image/jpg" onChange={changeFile}/>
            </div>

            <label>Bio</label>
            <textarea style={{resize: "vertical"}} placeholder="Tell the world about the things you love!"
                minLength={50} maxLength={1000} rows={4} value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}/>

            <label>Occupation</label>
            <input minLength={3} maxLength={50}
                   value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})}/>

            <label>Country</label>
            <select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                <option key="NONE" value={undefined}>Unspecified</option>
                {Object.entries(countryCodeToName).map((kv) => {
                    return <option key={kv[0]} value={kv[0]}>{kv[1]}</option>
                })}
            </select>


            <input id="edit-page-save-button" type="button" value="Save" onClick={handleSave}/>
        </div>
    </div>)
};

export default EditProfilePage;