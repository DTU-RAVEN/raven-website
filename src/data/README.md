
# RAVEN Website Content Editing Guide

This guide explains how to update team members and sponsors on the RAVEN website without coding knowledge.

## Editing Team Members

1. Open the file `src/data/team-members.json`
2. The file contains a list of team members, each with the following properties:
   - `name`: Team member's name
   - `role`: Their position or role in RAVEN
   - `program`: Their field of study or program
   - `image`: Path to their profile image (upload new images to `public/` folder)
   - `isBoard`: Set to `true` if they are a board member, otherwise `false`

3. To add a new member:
   - Copy an existing entry (including the curly braces `{}`)
   - Paste it before the closing `]` bracket
   - Add a comma `,` after the previous entry
   - Update the information with the new member's details

4. To remove a member:
   - Delete their entire entry (from `{` to `}`, including the comma)

5. To edit a member:
   - Simply change their values while keeping the format

**Example:**
```json
{
  "name": "New Person",
  "role": "New Role",
  "program": "Their Program",
  "image": "/path/to/image.jpg",
  "isBoard": false
}
```

## Editing Sponsors/Partners

1. Open the file `src/data/sponsors.json`
2. The file contains a list of sponsors, each with these properties:
   - `name`: Sponsor/partner name
   - `logo`: Path to their logo image (upload new logos to `public/` folder)
   - `contribution`: Type of support they provide

3. Follow the same steps as above to add, remove, or edit sponsors.

## Adding Images

1. For new images:
   - Use PNG or JPG files
   - Name files with simple names (no spaces, use hyphens instead)
   - Upload the files to the `public` directory
   - Reference them in the JSON as `/filename.jpg` (include the leading slash)

## Important Notes

1. Be careful with the JSON format:
   - Don't forget commas between items
   - Don't add a comma after the last item in a list
   - Always use double quotes `"` for property names and text values
   - Make sure all opening brackets/braces have matching closing ones

2. After making changes:
   - Save the file
   - Refresh your website to see the changes
