var config = require('./config');
var http = require('./applicationConfig');


http.listen(3000, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Listening on port ' + config.port);
	}
});

public static void fileViewOrDownload(String fileName, String fileType,
										String viewType, HttpServletRequest request,
										HttpServletResponse response, String modulePath) {

		if (!fileName.equals(null)) {
			String imageRootPath = null;

			if (StringUtils.equals(fileType, "image")) {

				imageRootPath = GenericUpload.generateUploadPath(modulePath) + fileName;
				
				System.out.println("image path "+imageRootPath);

			} else if (StringUtils.equals(fileType, "pdf")) {

				imageRootPath = GenericUpload.generateUploadPath(modulePath) + fileName;

			} else {

				imageRootPath = GenericUpload.generateUploadPath(modulePath) + fileName;
			}

			final StringBuilder actualPath = new StringBuilder();
			final File filePath = new File(actualPath.append(imageRootPath).toString());

			try {

				if (filePath.exists()) {

					FileInputStream inputStream = new FileInputStream(filePath);
					ServletOutputStream outStream = response.getOutputStream();

					String mimeType = request.getServletContext().getMimeType(filePath.getAbsolutePath());

					if (mimeType == null) {
						mimeType = "application/octet-stream";
					}

					response.setContentType(mimeType);
					response.setContentLength((int) filePath.length());

					// this condition is check it is for download or view purpose
					if (StringUtils.equals(viewType, "download")) {

						String headerKey = "Content-Disposition";
						String headerValue = String.format("attachment; filename=\"%s\"", filePath.getName());
						response.setHeader(headerKey, headerValue);
					}

					byte[] buffer = new byte[4096];

					int bytesRead = -1;

					while ((bytesRead = inputStream.read(buffer)) != -1) {
						outStream.write(buffer, 0, bytesRead);
					}

					inputStream.close();
					outStream.close();
				}

			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
	}
