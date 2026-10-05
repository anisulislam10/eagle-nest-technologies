# Firebase content administration

The public home page and portfolio read published projects from Firestore. The home page also reads published team members. `/admin` manages both collections with email/password sign-in, drafts, publishing, editing, deletion, and display order. Content changes update connected visitors in real time, without rebuilding the static site.

## Connect Firebase

1. Create or select a Firebase project and register a web app in Project settings.
2. Copy `.env.example` to `.env.local` and fill in the web app configuration. These public values identify the Firebase app; security comes from the Firestore rules. Never put service-account keys in `NEXT_PUBLIC_*` variables.
3. Create a Cloud Firestore database. Select production mode.
4. Publish `firestore.rules` using the Firebase console Rules editor, or run `firebase deploy --only firestore:rules --project YOUR_PROJECT_ID` after signing in with the Firebase CLI. Review any existing rules before replacing them. These rules cover this site's projects, team members, and admin membership only; other collections are denied.
5. Enable **Authentication → Sign-in method → Email/Password**. Add your site domain and `localhost` under Authentication's authorized domains as needed.
6. Create the administrator account in **Authentication → Users → Add user**. Copy its UID.
7. In the Firestore console, create `admins/USER_UID` with the boolean field `active: true`. Only project owners using the console/Admin SDK can grant this membership; browsers cannot create or change admin memberships. Do not use an email address as the document ID.
8. Restart `npm run dev` after changing environment variables. Visit `/admin` and sign in with that account.
9. Add the same six environment variables in Vercel and redeploy once. Later content changes do not require deployments.

To revoke an administrator, set their membership's `active` field to `false` or delete the membership document. Firestore rechecks membership for every read/write; the admin interface may need refreshing to reflect revoked access.

## Manage content

- **Projects:** title, category, description, image URL and description, comma-separated technologies, optional project URL, display order, published status.
- **Team:** name, role, biography, portrait URL and description, optional profile/LinkedIn URL, display order, published status.
- New entries start as drafts. Check **Published on the website** and save to display them publicly. Uncheck it to hide them.
- Lower order numbers display first. The home page shows up to six projects; `/portfolio` shows all published projects.
- Images can be uploaded directly from your computer (JPG, PNG, WebP; up to 5 MB) or entered as public HTTPS URLs. The editor shows a preview and upload progress. Save the entry after uploading to attach the image. An omitted image uses a simple placeholder.
- Empty collections stay empty. Demo content is not silently restored after deleting the final item.
- No public self-registration or password fields are exposed in content documents. Manage accounts and password resets through Firebase Authentication.

## Enable local image uploads

1. Open Firebase Console → Storage and create/enable the storage bucket. Complete any setup or billing requirements shown by Firebase.
2. Confirm `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` matches the bucket name displayed in the console. Restart the development server if you change it.
3. In **Storage → Rules** (not Firestore Rules), publish the complete contents of `storage.rules`. If prompted, grant the permissions required for Storage rules to read Firestore admin membership.
4. Alternatively deploy both sets of rules with `firebase deploy --only firestore:rules,storage --project YOUR_PROJECT_ID`.
5. Sign in at `/admin`, add/edit a project or team member, and choose an image from your computer. Wait for upload completion, then save.

Only active administrators can upload files. Images are stored under `content/projects/` or `content/team/` with unique names. These are public website assets, including images attached to drafts; do not upload private documents. Uploads cannot overwrite existing files. Removing an image from an entry, replacing it, canceling an edit, or deleting the entry does not delete the original stored asset; unused assets can be removed from the Firebase Storage console.

## Verification

Run `node --test tests/managed-content.test.cjs` and `npm run build`.

After connecting your project, verify these flows with a real admin and a separate non-admin account:

1. The admin can add/edit/delete projects and team members. A signed-out visitor sees only published entries.
2. A normal signed-in account cannot read drafts or save/delete content, even through the Firebase SDK directly.
3. Toggling publishing updates the public site. An empty collection shows its empty state.
4. Deleting/revoking `admins/UID` prevents further edits. A browser cannot write an admin document.

The build and local validation tests do not deploy or exercise live Firebase rules. Firebase configuration, rule publication, and the first administrator must be provisioned before live end-to-end verification.

Development uses `.next-dev`; production builds use `.next` to avoid missing-chunk errors when both run together. `vercel.json` is unchanged.
