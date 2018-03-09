// import 'bootstrap/less/bootstrap.less';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap';

import './libs/base.less';
import './libs/font-scms/less/style.less';
import './scmsUi/less/index.less';

import './scmsUi';

import ngHtmlContainer from './src/ngHtmlContainer/ngHtmlContainer';
import switchDirective from './src/switch/switchDirective';

import paginationDirective from './src/pagination/paginationDirective';
import paginationMiniDirective from './src/paginationMini/paginationMiniDirective';
import crumbDirective from './src/crumb/crumbDirective';

import ngCodeDirective from './src/ngCode/ngCodeDirective';
import cantonSelectDirective from './src/cantonSelect/cantonSelectDirective';
import changePwdDialogDirective from './src/changePwdDialog/changePwdDialogDirective';
import chartDirective from './src/chart/chartDirective';
import citysSelectDirective from './src/citysSelect/citysSelectDirective';
import citysSelectMultipleDirective from './src/citysSelectMultiple/citysSelectMultipleDirective';
import datePickerDirective from './src/datePicker/datePickerDirective';
import errorNoDataDirective from './src/errorNoData/errorNoDataDirective';
import exportDirective from './src/export/exportDirective';
import formRadioDirective from './src/formRadio/formRadio';
import imageShowDirective from './src/imageShow/imageShow';
import kaImageUploadDirective from './src/kaImageUpload/kaImageUploadDirective';
import loadingDirective from './src/loading/loadingDirective';
import mainNavDirective from './src/mainNav/mainNavDirective';
import multiselectDirective from './src/multiselect/multiselect';
// import noPermissionDirective from "./src/noPermission/noPermission";
import qrcodeDirective from './src/qrcode/qrcode';
import searchDropdownDirective from './src/searchDropdown/searchDropdown';
import starRatingDirective from './src/starRating/starRating';
import stepsDirective from './src/steps/steps';
import tableDirective from './src/table/table';
import timePickerDirective from './src/timePicker/timePickerDirective';
import tooltipDirective from './src/tooltip/tooltip';
import treeViewDirective from './src/treeView/treeView';
import fileUploaderDirective from './src/fileUploader/index';
import datePicker from './src/ngDatePicker/datePicker';
import datePickerRange from './src/ngDatePicker/datePickerRange';
import weekPicker from './src/ngDatePicker/weekPicker';
import timePicker from './src/ngDatePicker/timePicker';
import buttonDropdown from './src/buttonDropdown/buttonDropdown';
import selectDropdown from './src/selectDropdown/selectDropdown';
import imageUpload from './src/imageUpload/imageUpload';

import numberSelect from './src/numberSelect/numberSelect';


export default {
  'ngCode/ngCodeDirective': ngCodeDirective,
  'switch/switchDirective': switchDirective,

  'ngHtmlContainer/ngHtmlContainer': ngHtmlContainer,
  'cantonSelect/cantonSelectDirective': cantonSelectDirective,
  'changePwdDialog/changePwdDialogDirective': changePwdDialogDirective,
  'chart/chartDirective': chartDirective,
  'citysSelect/citysSelectDirective': citysSelectDirective,
  'citysSelectMultiple/citysSelectMultipleDirective': citysSelectMultipleDirective,
  'crumb/crumbDirective': crumbDirective,
  'datePicker/datePickerDirective': datePickerDirective,
  'errorNoData/errorNoDataDirective': errorNoDataDirective,
  'export/exportDirective': exportDirective,
  fileUploader: fileUploaderDirective,
  'formRadio/formRadioDirective': formRadioDirective,
  'imageShow/imageShowDirective': imageShowDirective,
  'kaImageUpload/kaImageUploadDirective': kaImageUploadDirective,
  'loading/loadingDirective': loadingDirective,
  'mainNav/mainNavDirective': mainNavDirective,
  'multiselect/multiselectDirective': multiselectDirective,
  // 'noPermission/noPermissionDirective': noPermissionDirective,
  'pagination/paginationDirective': paginationDirective,
  'paginationMini/paginationMiniDirective': paginationMiniDirective,
  'qrcode/qrcodeDirective': qrcodeDirective,
  'searchDropdown/searchDropdownDirective': searchDropdownDirective,
  'starRating/starRatingDirective': starRatingDirective,
  'steps/stepsDirective': stepsDirective,
  'table/tableDirective': tableDirective,
  'timePicker/timePickerDirective': timePickerDirective,
  'tooltip/tooltip': tooltipDirective,
  'treeView/treeViewDirective': treeViewDirective,
  'ngDatePicker/datePicker': datePicker,
  'ngDatePicker/datePickerRange': datePickerRange,
  'ngDatePicker/weekPicker': weekPicker,
  'ngDatePicker/timePicker': timePicker,
  buttonDropdown,
  selectDropdown,
  'imageUpload/imageUpload': imageUpload,
  numberSelect,
};
