import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useState } from 'react'
import { useToast } from 'native-base'
import { API_URL } from '@env'
import { useDeleteProductsImageMutation } from '@features/ProductsApiSlice'

export function useUploadImage(multiple?: boolean) {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [deleteImageProducts, { isLoading }] = useDeleteProductsImageMutation()
  const [photoProduct, setPhotoProduct] = useState<
    { name: string; uri: string; type: string; id?: string }[]
  >([])
  const toast = useToast()

  /**
   * Componente para selecionar foto
   * @param {number} uploadLimit - Defini limite de upload em MB
   */
  async function handleUserPhotoSelect(
    multiple?: boolean,
    uploadLimit?: number
  ) {
    try {
      setPhotoIsLoading(true)
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
        selectionLimit: 3,
      })

      if (photoSelected.canceled) return

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        )

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 15) {
          return toast.show({
            title: 'Essa Imagem é muito grande. Escolha uma de ate 5MB',
            placement: 'top',
            bgColor: 'error.700',
          })
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        if (multiple) {
          if (uploadLimit && photoProduct.length >= uploadLimit) {
            return toast.show({
              title: 'Você atingiu o limite de fotos',
              placement: 'top',
              bgColor: 'error.700',
            })
          } else {
            setPhotoProduct((e) => [
              ...e,
              {
                name: `${fileExtension}`.toLowerCase(),
                uri: photoSelected.assets[0].uri,
                type: `${photoSelected.assets[0].type}/${fileExtension}`,
              },
            ])
          }
        } else {
          setPhotoProduct([
            {
              name: `${new Date().getTime()}.${fileExtension}`,
              uri: photoSelected.assets[0].uri,
              type: `${photoSelected.assets[0].type}/${fileExtension}`,
            },
          ])
        }

        toast.show({
          title: 'Foto atializada',
          placement: 'bottom',
          bgColor: 'green.500',
        })

        setTimeout(() => {
          toast.closeAll()
        }, 2000)
      }
    } catch (error) {
    } finally {
      setPhotoIsLoading(false)
    }
  }

  function handleSetPhoto(photos: { path: string; id: string }[]) {
    console.log(photos)
    setPhotoProduct(
      photos.map((e) => ({
        name: e?.name,
        uri: e?.uri ? e.uri : `${API_URL}images/${e.path}`,
        type: e?.type,
        id: e.id,
      }))
    )
  }

  async function handleDeletePhoto(
    photo: { name: string; uri: string; type: string; id?: string },
    index: number
  ) {
    try {
      setPhotoIsLoading(true)
      if (photo?.id) {
        const data = { images: [`${photo.id}`] }
        await deleteImageProducts(data)
      }
      setPhotoProduct((e) => e.filter((_, i) => i !== index))
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return {
    photoIsLoading,
    photoProduct,
    handleSetPhoto,
    handleUserPhotoSelect,
    handleDeletePhoto,
  }
}
