tinymce.init({
    selector: 'textarea#postEditor',
    plugins: 'advlist autolink lists link image charmap preview anchor pagebreak',
    toolbar_mode: 'floating',
    content_css: '../public/css/admin.css',
    images_file_types: 'jpg,svg,webp',
    file_picker_types: 'file image media',
    block_unsupported_drop: false,
    image_title: true,
    file_picker_callback: (cb, value, meta) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener('load', () => {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                const id = 'blobid' + (new Date()).getTime();
                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
        });

        input.click();
    },
    style_formats: [
        { title: 'TextRed', inline: 'span', classes: ['text-red'] }
    ],
    // The following option is used to append style formats rather than overwrite the default style formats.
    style_formats_merge: true
});