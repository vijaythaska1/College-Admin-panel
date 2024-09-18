import { createAsyncThunk } from '@reduxjs/toolkit';
import APIServices from './APIServices.js';
const APIS = {};
APIS.authLogin = createAsyncThunk('auth/login', APIServices?.adminLogin);
APIS.profileGet = createAsyncThunk('auth/UserProfile', APIServices?.ProfilGet);
APIS.changePassword = createAsyncThunk('auth/changePassword', APIServices.Passwordchange);
APIS.logout = createAsyncThunk("auth/logout", APIServices.logout);
APIS.cmsget = createAsyncThunk("auth/cmsget", APIServices.GetCms);
APIS.UpdateCms = createAsyncThunk("auth/CmsUpdate", APIServices.UpdateCms);
APIS.getUser = createAsyncThunk("auth/findUser", APIServices.getUser);



export default APIS;