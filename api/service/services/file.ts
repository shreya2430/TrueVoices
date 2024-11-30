import {
	BlobClient,
	BlobSASPermissions,
	BlobSASSignatureValues,
	BlobServiceClient,
	generateBlobSASQueryParameters,
	SASProtocol,
	StorageSharedKeyCredential,
} from '@azure/storage-blob'
import { configDotenv } from 'dotenv'

configDotenv()
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || ''
if (connectionString.length === 0) {
	throw new Error('AZURE_STORAGE_CONNECTION_STRING is not set')
}

const blobService = BlobServiceClient.fromConnectionString(connectionString)
const containerClient = blobService.getContainerClient('true-voice')

export const uploadFile = async (file: Express.Multer.File, path: string) => {
	try {
		const blobName = `${path}/${file.originalname}`
		const blockBlobClient = containerClient.getBlockBlobClient(blobName)
		await blockBlobClient.uploadData(file.buffer, {
			blobHTTPHeaders: {
				blobContentType: file.mimetype,
				blobContentDisposition: `attachment; filename="${file.originalname}"`,
			},
		})
		return generateSasUrl(blockBlobClient)
	} catch (error) {
		console.error(error)
		throw new Error('Failed to upload file')
	}
}

const generateSasUrl = (blobClient: BlobClient) => {
	const sasOptions: BlobSASSignatureValues = {
		containerName: 'true-voice',
		blobName: blobClient.name,
		permissions: BlobSASPermissions.parse('r'),
		startsOn: new Date(),
		expiresOn: new Date(new Date().valueOf() + 86400 * 30),
		protocol: SASProtocol.HttpsAndHttp,
	}

	const sasToken = generateBlobSASQueryParameters(
		sasOptions,
		blobClient.credential as StorageSharedKeyCredential,
	).toString()
	return `${blobClient.url}?${sasToken}`
}
