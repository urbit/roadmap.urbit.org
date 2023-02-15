import {
  generateDisplayDate,
  formatDate,
} from "@urbit/foundation-design-system";
import Link from "next/link";
import { dateUrbit } from "../lib/util";


export default function UpdatePreview({ post }) {
  const date = generateDisplayDate(post.date);
  return (
    <div key={post.slug} className="mb-12 cursor-pointer">
      <Link href={`/updates/${post.slug}`}>
        <div className="flex items-center md:flex-row flex-col">

          <div className="w-full">
            <h3 className="md:mt-0 !mb-2">{dateUrbit(new Date(date))}</h3>
            {post?.description && <p className="!mt-4">{post.description}</p>}

            
          </div>
        </div>
      </Link>
    </div>
  );
}
