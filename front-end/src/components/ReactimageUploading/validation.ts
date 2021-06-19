import { DEFAULT_NULL_INDEX } from './constants';
import {ResolutionType, ErrorsType, ImageListType} from './typings';
import { getImage } from './utils';

export const isResolutionValid = (
  image: HTMLImageElement,
  resolutionType: ResolutionType,
  resolutionWidth: number = 0,
  resolutionHeight: number = 1
): boolean => {
  if (!resolutionWidth || !resolutionHeight || !image.width || !image.height)
    return true;
  switch (resolutionType) {
    case 'absolute': {
      if (image.width === resolutionWidth && image.height === resolutionHeight)
        return true;
      break;
    }
    case 'ratio': {
      const ratio = resolutionWidth / resolutionHeight;
      if (image.width / image.height === ratio) return true;
      break;
    }
    case 'less': {
      if (image.width <= resolutionWidth && image.height <= resolutionHeight)
        return true;
      break;
    }
    case 'more': {
      if (image.width >= resolutionWidth && image.height >= resolutionHeight)
        return true;
      break;
    }
    default:
      break;
  }
  return false;
};

export const isImageValid = (fileType: string) => {
  if (fileType.includes('image')) {
    return true;
  }
  return false;
};

export const isMaxFileSizeValid = (fileSize : number, maxFileSize? : number) => {
  return maxFileSize ? fileSize <= maxFileSize : true;
};

export const isAcceptTypeValid = (acceptType : string[] | undefined, fileName : string) => {
  if (acceptType && acceptType.length > 0) {
    const type: string = fileName.split('.').pop() || '';
    if (
      acceptType.findIndex(
        (item) => item.toLowerCase() === type.toLowerCase()
      ) < 0
    )
      return false;
  }
  return true;
};

export const isMaxNumberValid = (totalNumber : number, maxNumber : number, keyUpdate : number) => {
  if (maxNumber !== 0 && !maxNumber) return true;
  if (keyUpdate === DEFAULT_NULL_INDEX) {
    if (totalNumber <= maxNumber) return true;
  } else if (totalNumber <= maxNumber + 1) return true;
  return false;
};

interface getErrorValidationI {
  fileList : ImageListType;
  value: ImageListType;
  maxNumber: number;
  keyUpdate: number;
  acceptType?: string[];
  maxFileSize?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  resolutionType?: ResolutionType;
}
export const getErrorValidation = async (arg : getErrorValidationI): Promise<ErrorsType> => {
  const newErrors: ErrorsType = {};
  if (!isMaxNumberValid(arg.fileList.length + arg.value.length, arg.maxNumber, arg.keyUpdate)) {
    newErrors.maxNumber = true;
  } else {
    for (let i = 0; i < arg.fileList.length; i += 1) {
      const { file } = arg.fileList[i];
      if (!file) continue;
      if (!isImageValid(file.type)) {
        newErrors.acceptType = true;
        break;
      }
      if (!isAcceptTypeValid(arg.acceptType, file.name)) {
        newErrors.acceptType = true;
        break;
      }
      if (!isMaxFileSizeValid(file.size, arg.maxFileSize)) {
        newErrors.maxFileSize = true;
        break;
      }
      if (arg.resolutionType) {
        const image = await getImage(file);
        const checkRes = isResolutionValid(
          image,
          arg.resolutionType,
          arg.resolutionWidth,
          arg.resolutionHeight
        );
        if (!checkRes) {
          newErrors.resolution = true;
          break;
        }
      }
    }
  }
  if (Object.values(newErrors).find(Boolean)) return newErrors;
  return null;
};
