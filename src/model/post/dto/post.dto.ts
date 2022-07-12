export class PostDto {
    constructor(
        title?: string,
        sub_title?: string,
        url_title?: string,
        content?: string,
        create_at?: Date,
        last_edit_at?: Date,
        last_edit_by?: string
    ){
        this.title = title;
        this.sub_title = sub_title;
        this.url_title = url_title;
        this.content = content;
        this.create_at = create_at;
        this.last_edit_at = last_edit_at;
        this.last_edit_by = last_edit_by;
    }
    title: string;
    sub_title: string;
    url_title: string;
    content: string;
    create_at: Date;
    last_edit_at: Date;
    last_edit_by: string;
}
