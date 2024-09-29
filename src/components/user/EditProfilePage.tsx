import '../login/LoginPage.css'
import './EditProfilePage.css'
import './ProfilePage.css'
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext.ts";
import userIcon from "../../assets/images/icons/user-icon.png";
import GenericClientError from "../../util/GenericClientError.ts";
import {BABEL_URL, countryCodeToName} from "../../util/constants.ts";
import useFetchMultipart from "../../hooks/useFetchMultipart.ts";
import ProfileUpdateFields from "../../interfaces/body/ProfileUpdateFields.ts";
import * as Cookies from "js-cookie";
import UserWithProfileResponse from "../../interfaces/response/UserWithProfileResponse.ts";
import {generateImageURL} from "../../util/util.ts";

/*
* TODO:
*  - Make sure we can clear the Profile Picture
*  - Flesh out details
* */

const EditProfilePage = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const [ profileImg, setProfileImg ] = useState<undefined|File>(undefined);
    const [formData, setFormData] = useState<{bio: string, country: string, occupation: string}>({
        bio: user!.profile.bio == null ? "" : user!.profile.bio,
        country: user!.profile.country == null ? "" : user!.profile.country,
        occupation: user!.profile.occupation == null ? "" : user!.profile.occupation,
    })
    const [formStatus, setFormStatus] = useState<{status: string, type: "SUCCESS" | "FAILURE"}>({
        status: "",
        type: "SUCCESS",
    })

    const { doRequest, statusCode} = useFetchMultipart<ProfileUpdateFields>(
        BABEL_URL + "users/self",
        "PATCH",
        Cookies.default.get("token")
    );

    function changeFile(e: ChangeEvent<HTMLInputElement>) {
        setProfileImg(e.target.files === null ? undefined : e.target.files[0]);
    }

    function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        doRequest({name: "profile", content: formData}, profileImg !== undefined ? {name: "file", content: profileImg} : undefined)

        setFormStatus({"status": "Redirecting...", type: "SUCCESS"})

        setTimeout(() => {
            navigate(`/users/${user!.username}`);
        }, 1500)
    }

    useEffect(() => {
        async function updateIf204(status: number|undefined){
            if(status === 204){ // means we successfully updated fields in profile
                const r = await fetch(BABEL_URL+"users/self", {headers: {"Authorization": "Bearer " + Cookies.default.get("token")}})
                if(r.ok) setUser(await r.json() as UserWithProfileResponse);
            }
        }

        updateIf204(statusCode);
    }, [statusCode]);

    if(username !== user?.username){
        throw new GenericClientError("FORBIDDEN", "You do not have access to this page.");
    }

    return (<div id="login-page-container">
        <div id="edit-page-panel">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img id="profile-img" src={(!profileImg ? undefined : URL.createObjectURL(profileImg) )|| generateImageURL(user!.profile.profilePictureUrl) || userIcon}
                     alt="profile picture"/>

                <input id="edit-page-upload" type="file" accept="image/png, image/jpg" onChange={changeFile}/>
            </div>

            <p style={{color: formStatus.type === "SUCCESS" ? "green": "red", textAlign: "center"}} >{formStatus.status}</p>

            <form onSubmit={handleSave}>
                <label>Bio</label>
                <textarea style={{resize: "vertical"}} placeholder="Tell the world about the things you love!"
                    minLength={50} maxLength={1000} rows={4} value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}/>

                <label>Occupation</label>
                <input minLength={3} maxLength={50} type="text"
                       value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})}/>

                <label>Country</label>
                <select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                    <option key="NONE" value={undefined}>Unspecified</option>
                    {Object.entries(countryCodeToName).map((kv) => {
                        return <option key={kv[0]} value={kv[0]}>{kv[1]}</option>
                    })}
                </select>

                <input id="edit-page-save-button" type="submit" value="Save"/>
            </form>
        </div>
    </div>)
};

export default EditProfilePage;