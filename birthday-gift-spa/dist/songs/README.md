# How to Add Your Songs

To play the actual songs in the "Our Songs" section, follow these steps:

## Step 1: Get the Audio Files
Download or convert the following songs to MP3 format:
1. Since Tum - JANI
2. Humsafar - Taimour Baig
3. Ishq Wala Love - Various Artists
4. Kaise Bataaoon - KK
5. The Fate of Ophelia - Taylor Swift

## Step 2: Rename the Files
Rename each MP3 file to match these exact names:
- `since-tum.mp3`
- `humsafar.mp3`
- `ishq-wala-love.mp3`
- `kaise-bataaoon.mp3`
- `fate-of-ophelia.mp3`

## Step 3: Add Files to This Folder
Place all 5 MP3 files in this `public/songs/` folder.

## Step 4: Test
Refresh the website and go to "Our Songs" section. Click the Play button to hear your songs!

## Note
- Make sure the files are in MP3 format
- File names must match exactly (case-sensitive)
- The songs will play directly on the website (not in an external player)
- Maximum file size recommended: 5MB per song for faster loading

## Alternative: Use Online Audio Files
If you don't want to host the files locally, you can replace the paths in `src/pages/Home.jsx` with direct URLs to your audio files hosted online.