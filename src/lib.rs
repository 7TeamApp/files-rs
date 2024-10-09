#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
use napi::{Error, Result, Status};

use glob::glob;

use std::{
    fs,
    path::{Path, PathBuf},
};

fn new_err(message: String) -> Result<()> {
    Err(Error::new(Status::Unknown, message))
}

pub fn copy_glob_multy(patterns: Vec<String>, out_dir_str: String) -> Result<()> {
    for pattern in patterns {
        copy_glob_single(pattern, &out_dir_str)?;
    }

    Ok(())
}

pub fn copy_glob_single(pattern: String, out_dir_str: &String) -> Result<()> {
    match glob(&pattern) {
        Ok(paths) => {
            let mut peekable_paths = paths.peekable();

            if peekable_paths.peek().is_none() {
                new_err("there were no items found that matched this pattern".to_string())?;
            }

            for path_res in peekable_paths {
                match path_res {
                    Ok(path) => copy_single(&path, &Path::new(&out_dir_str).to_path_buf())?,
                    Err(e) => new_err(e.error().to_string())?,
                }
            }
        }
        Err(e) => new_err(e.to_string())?,
    };

    Ok(())
}

fn copy_multy(paths_str: Vec<String>, out_dir_str: String) -> Result<()> {
    for path_str in paths_str {
        copy_single(
            &Path::new(&path_str).to_path_buf(),
            &Path::new(&out_dir_str).to_path_buf(),
        )?;
    }

    Ok(())
}

fn copy_single(path: &PathBuf, out_dir: &PathBuf) -> Result<()> {
    if !out_dir.exists() {
        fs::create_dir_all(out_dir)?;
    }

    if path.is_file() {
        fs::copy(path, out_dir.join(path.file_name().unwrap()))?;
    } else if path.is_dir() {
        for sub_path in fs::read_dir(path)?.map(|r| r.unwrap().path()) {
            copy_single(&sub_path, &out_dir.join(path.file_name().unwrap()))?;
        }
    } else {
        new_err("File or folder not found".to_string())?;
    }

    Ok(())
}

#[napi]
pub fn js_copy_single(path_str: String, out_dir_str: String) -> Result<()> {
    copy_single(
        &Path::new(&path_str).to_path_buf(),
        &Path::new(&out_dir_str).to_path_buf(),
    )
}

#[napi]
pub fn js_copy_multy(paths_str: Vec<String>, out_dir_str: String) -> Result<()> {
    copy_multy(paths_str, out_dir_str)
}

#[napi]
pub fn js_copy_glob_single(pattern: String, out_dir_str: String) -> Result<()> {
    copy_glob_single(pattern, &out_dir_str)
}

#[napi]
pub fn js_copy_glob_multy(patterns: Vec<String>, out_dir_str: String) -> Result<()> {
    copy_glob_multy(patterns, out_dir_str)
}
