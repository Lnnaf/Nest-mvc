import { PostStatus } from "src/enums/post.status.enum";

export class PostDto {
    constructor(
        post_id?: number,
        title?: string,
        sub_title?: string,
        url_title?: string,
        content?: string,
        create_at?: Date,
        last_edit_at?: Date,
        last_edit_by?: string,
        postStatus?:PostStatus
    ){
        this.post_id = post_id;
        this.title = title;
        this.sub_title = sub_title;
        this.url_title = url_title;
        this.content = content;
        this.create_at = create_at;
        this.last_edit_at = last_edit_at;
        this.last_edit_by = last_edit_by;
        this.post_status = postStatus;
    }
    post_id: number;
    title: string;
    sub_title: string;
    url_title: string;
    content: string;
    create_at: Date;
    last_edit_at: Date;
    last_edit_by: string;
    post_status: PostStatus
}
